import { Button as TButton, type ButtonProps } from 'tamagui';

type Props = {
  text?: string;
};

export default function Button({ text }: Props) {
  return <TButton onPress={() => console.log('Heja HIF')}>{text}</TButton>;
}
