import styled from 'styled-components';

const CartButton = ({ onClick, isAdded }) => {
  return (
    <Button onClick={onClick} $isAdded={isAdded}>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={13}
        height={13}
      >
        <path
          d="m10.904 21.288c.666.44 1.525.44 2.19 0 2.115-1.396 6.72-4.733 8.704-8.467 2.615-4.926-.456-9.839-4.516-9.839-2.314 0-3.706 1.209-4.476 2.248-.324.445-.947.544-1.393.22-.085-.061-.159-.136-.22-.22-.77-1.039-2.162-2.248-4.476-2.248-4.06 0-7.131 4.913-4.515 9.839 1.982 3.734 6.589 7.071 8.702 8.467"
          fill="#b0b8c1"
          fillRule="evenodd"
        ></path>
      </svg>
    </Button>
  );
};

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }

  ${({ $isAdded }) =>
    $isAdded &&
    `
      svg path {
        fill: red; 
      }
    `}
`;
export default CartButton;
