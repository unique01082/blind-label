import { Button, ButtonProps } from 'antd';
import { Icon } from './Icon';

interface BoxProps extends ButtonProps {
  label: string;
  hidden?: boolean;
}

const Box: React.FC<BoxProps> = ({ label, hidden, ...rest }) => {
  const type = hidden ? 'bl-aichong01' : label;

  return (
    <Button {...rest}>
      <Icon type={type} size={32} />
    </Button>
  );
};

export default Box;
