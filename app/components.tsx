import { BottomSheetTextInputProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput";
import { forwardRef, useCallback, useEffect } from "react";
import {
  Platform,
  Button as DefaultButton,
  TextInput as DefaultTextInput,
  ButtonProps as DefaultButtonProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import {
  Button as Material3Button,
  ButtonProps as Material3ButtonProps,
  TextInputProps as Material3TextInputProps,
  TextInput as Material3TextInput,
  Searchbar,
} from "react-native-paper";
import { TextInput as GestureHandlerTextInput } from "react-native-gesture-handler";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import { SearchbarProps } from "react-native-paper";
type ButtonProps = Material3ButtonProps & DefaultButtonProps;
export const Button = Platform.select({
  android: (props: Omit<ButtonProps, "children">) => (
    <Material3Button {...props}>{props.title}</Material3Button>
  ),
  default: (props: DefaultButtonProps) => <DefaultButton {...props} />,
});

export const TextInput = Platform.select({
  android: (props: Material3TextInputProps) => (
    <Material3TextInput {...props} />
  ),
  default: (props: Material3TextInputProps) => <DefaultTextInput {...props} />,
});

export const BottonSheetSearchBar = forwardRef<
  GestureHandlerTextInput,
  SearchbarProps & Material3TextInputProps
>(({ onFocus, onBlur, ...rest }, ref) => {
  //#region hooks
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
  //#endregion

  //#region callbacks
  const handleOnFocus = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = true;
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, shouldHandleKeyboardEvents],
  );
  const handleOnBlur = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = false;
      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, shouldHandleKeyboardEvents],
  );
  //#endregion

  //#region effects
  useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);
  //#endregion
  return Platform.select({
    android: (
      <Searchbar
        ref={ref}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...rest}
      />
    ),
    default: (
      <DefaultTextInput
        ref={ref}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...rest}
      />
    ),
  });
});
