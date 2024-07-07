import { FC } from "react"
import './style.scss'


const Header: FC = () => {
  return (
    <>
      <div className="header-wrapper">
        <h1 className="styled-logo">
          <a href="#">TodoList</a>{' '}
          <span>
            Powered by{' '}
            <a href="https://github.com/RomSmile" target="_blank" rel="noreferrer">
              RomSmile
            </a>
          </span>
        </h1>
      </div>
    </>
  );
};

export default Header;
