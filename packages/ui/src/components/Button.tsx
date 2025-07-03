import { Button as TButton } from '@tamagui/ui';

type Props = {
  text?: string;
};

export default function Button({ text }: Props) {
  return <TButton>{text}</TButton>;
}
