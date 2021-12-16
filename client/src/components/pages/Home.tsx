/* eslint-disable @typescript-eslint/no-unused-vars */
import { VFC } from 'react';
import { Link } from 'react-router-dom';
import img from '../../img/hdr_univ-logo.png';
import homeImage from '../../img/home.jpg';
import './Home.css';

interface Props {
  title: string;
  description: string;
  isMainPage: boolean;
}
//   const {title, description, isMainPage} = props
const Home: VFC<Props> = (props) => {
  const { title, description, isMainPage } = props;

  return (
    <div className="home-body">
      <div className="home-background-image">
        <img src={homeImage} alt="" />
      </div>
      <div className="home-wrapper">
        <div className="home-content">
          <img src={img} alt="" />
          <div className="title">{title}</div>
          <div className="description">{description}</div>
          <div className="home-buttons">
            {isMainPage ? (
              <>
                <Link to="/document">
                  <div className="link-button">説明を見る</div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <div className="link-button">戻る</div>
                </Link>
              </>
            )}
            <Link to="/form">
              <div className="link-button try-button">試してみる</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
