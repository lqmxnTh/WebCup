import React from "react";
import "../styles/Home.css";
import Price from "../component/Price";
import CuteSpider from "../component/CuteSpider";

const Home = () => {
  return (
    <>
      <div id="home-landing-panel"></div>
      <CuteSpider />

      <div id="home-panel-containers">
        <div id="home-panel-one" className="home-panel">
          <h1 className="home-panel-one-message">Reliques Arcane</h1>
        </div>
        <div id="home-panel-two" className="home-panel">
          <div className="home-panel-image-two"></div>

          <div className="home-panel-text">
            <p>
              Explorez notre vaste collection enchantée qui regorge de potions
              envoûtantes, de talismans protecteurs, d'objets rituels sacrés et
              bien plus encore. Chaque produit a été imprégné de magie par ses
              précédents propriétaires, lui conférant une aura unique et une
              énergie particulière.
            </p>
          </div>
        </div>

        <div id="home-panel-three" className="home-panel">
          <h3>Best Seller</h3>
          <div className="card">
            <img
              src={
                "https://i.pinimg.com/564x/97/20/5c/97205c33e83d789daa08013ad409fcdd.jpg"
              }
              alt="Couteau"
            />
            <h2>Couteau</h2>
            <Price Price="19" />
            <p>
              <a href="">
                <button>Achetez</button>
              </a>
            </p>
          </div>
          <div className="card">
            <img
              src={
                "https://i.pinimg.com/564x/c0/52/cb/c052cbf70b8bd8a28cba7207ca8776b9.jpg"
              }
              alt="Chapeau"
            />
            <h2>Chapeau</h2>
            <Price Price="29.99" />
            <p>
              <a href="">
                <button>Achetez</button>
              </a>
            </p>
          </div>
          <div className="card">
            <img
              src={
                "https://i.pinimg.com/564x/98/7a/4a/987a4a176ebb723aea7c07cddb41c40d.jpg"
              }
              alt="lunette"
            />
            <h2>Lunette</h2>
            <Price Price="9.99" />
            <p>
              <a href="">
                <button>Achetez</button>
              </a>
            </p>
          </div>
        </div>

        <div id="home-panel-four" className="home-panel">
          <div className="home-panel-image-four"></div>

          <div className="home-panel-text">
            <p>
              De plus, si vous avez des artefacts magiques dont vous souhaitez
              vous séparer, nous offrons également la possibilité de les vendre
              à notre communauté enchantée. Partagez votre magie avec d'autres
              passionnés en nous confiant vos trésors pour qu'ils trouvent une
              nouvelle maison où ils seront appréciés et honorés à leur juste
              valeur.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;