import { memo } from "react";
import { Button } from "@arco-design/mobile-react";
import { ButtonProps, withLink } from "@appboxo/ui-kit";

export const PrimaryButton = memo((props: ButtonProps) => {
  return withLink(
    <Button size="huge" type="primary" {...props}>
      {props.text}
    </Button>,
    props,
  );
});

export const SecondaryButton = memo((props: ButtonProps) => {
  return withLink(
    <Button size="huge" type="default" {...props}>
      {props.text}
    </Button>,
    props,
  );
});

export const TertiaryButton = memo((props: ButtonProps) => {
  return withLink(
    <Button size="huge" type="ghost" {...props}>
      {props.text}
    </Button>,
    props,
  );
});

export const QuaternaryButton = memo((props: ButtonProps) => {
  return withLink(
    <Button type="default" size="medium" shape="round" {...props}>
      {props.text}
    </Button>,
    props,
  );
});
