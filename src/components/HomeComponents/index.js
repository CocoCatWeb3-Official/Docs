import('./home.css')
import Link from '@docusaurus/Link';
import { useTranslation } from 'react-i18next'
function HomePage() {
  const {t} = useTranslation();
  return (
    <div className="container">
      <div className="section1">
        <div className="title">{t('The CocoCat Knowledge Layer')}</div>
        <div className="msg1 msg">
          Welcome to the technical documentation and knowledge resources for
          CocoCat protocols and scaling technologies.
        </div>
        <div className="msg2 msg">
          Learn how to build and deploy dApps on CocoCat and stay updated on the
          latest research.
        </div>
      </div>
      <div className="section2 section">
        <div className="item-box">
          <div className="fir">
            <div className="p-top">
              <div className="img-box">
                <img src="/img/homepage/build.png" alt="" />
              </div>
              <div className="txt-box">BUILD</div>
            </div>
            <div className="p-bottom">
              Build today using CocoCat technology.
            </div>
          </div>
          <div className="sec">
            <div className="sec-container">
              <Link href="/docs/CocoApp/Deployed-and-Upgrade" className="p-top" >
                <div className="txt-item">CocoApp Development guide</div>
                <div className="icon-item">
                  <img src="/img/homepage/arrow.png" alt="" />
                </div>
              </Link>
              <div className="p-bottom">
                CocoApp supports front-end technology stacks such as HTML5, Vue,
                and React. To accelerate the development process, we provide...
              </div>
            </div>
          </div>
          <div className="sec">
            <div className="sec-container">
              <Link href="/docs/CocoApp/SDK-Reference" className="p-top">
                <div className="txt-item">CocoAPP API</div>
                <div className="icon-item">
                  <img src="/img/homepage/arrow.png" alt="" />
                </div>
              </Link>
              <div className="p-bottom">
                CocoAPP API is a set of interfaces designed to facilitate
                communication between third-party applications (i.e., CocoAPP)
                and the CocoCat platform.
              </div>
            </div>
          </div>
          <div className="sec">
            <div className="sec-container">
              <Link href='/docs/Self-Service/Deploy' className="p-top">
                <div className="txt-item">Self Service</div>
                <div className="icon-item">
                  <img src="/img/homepage/arrow.png" alt="" />
                </div>
              </Link>
              <div className="p-bottom">
                Primarily provides deployment guides for CocoCat self-service,
                aiming to ensure smooth deployment and proper operation of the
                self-service...
              </div>
            </div>
          </div>
        </div>
        <div className="item-box">
          <div className="fir">
            <div className="p-top">
              <div className="img-box">
                <img src="/img/homepage/learn.png" alt="" />
              </div>
              <div className="txt-box">LEARN</div>
            </div>
            <div className="p-bottom">Learn more about Cococat technology.</div>
          </div>
          <div className="sec">
            <div className="sec-container">
              <div className="p-top">
                <div className="txt-item">P2P encryption technology</div>
                <div className="icon-item">
                  <img src="/img/homepage/arrow.png" alt="" />
                </div>
              </div>
              <div className="p-bottom">
                Resources focus on current and future cryptographic technologies
                used by CocoCat.
              </div>
            </div>
          </div>
          <div className="sec">
            <div className="sec-container">
              <div className="p-top">
                <div className="txt-item">Innovation & design </div>
                <div className="icon-item">
                  <img src="/img/homepage/arrow.png" alt="" />
                </div>
              </div>
              <div className="p-bottom">
                Resources focused on both current and future CocoCat
                technologies. It features detailed guides, foundational
                concepts, and previews of ...
              </div>
            </div>
          </div>
          <div className="sec">
            <div className="sec-container">
              <div className="p-top">
                <div className="txt-item">More</div>
                <div className="icon-item">
                  <img src="/img/homepage/arrow.png" alt="" />
                </div>
              </div>
              <div className="p-bottom">
                Coming.
                <br />
                <span style={{opacity:0}}>Coming.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section3 section">
        <div className="title">Quickstart </div>
        <div className="msg">Are you ready to start building?</div>
        <div className="box-col">
          <div className="item-box">
            <div className="fir">
              <img
                className="origin"
                src="/img/homepage/container.png"
                alt=""
              />
              <img
                className="active"
                src="/img/homepage/container_active.png"
                alt=""
              />
            </div>
            <div className="sec">CocoCat SDK: Deploy a local test rollup</div>
          </div>
          <div className="item-box">
            <div className="fir">
              <img className="origin" src="/img/homepage/app.png" alt="" />
              <img
                className="active"
                src="/img/homepage/app_active.png"
                alt=""
              />
            </div>
            <div className="sec">Cococat: Build a new web3 dApp</div>
          </div>
          <div className="item-box">
            <div className="fir">
              <img
                className="origin"
                src="/img/homepage/explore.png"
                alt=""
              />
              <img
                className="active"
                src="/img/homepage/explore_active.png"
                alt=""
              />
            </div>
            <div className="sec">Explore the sandbox</div>
          </div>
        </div>
      </div>
      <div className="section4 section">
        <div className="title">Developer resources </div>
        <div className="msg">
          For developers who know what they want to build and are ready to go.
        </div>
        <div className="box-col">
          <div className="item-box">
            <div className="fir">
              <img className="origin" src="/img/homepage/box.png" alt="" />
              <img
                className="active"
                src="/img/homepage/box_active.png"
                alt=""
              />
            </div>
            <div className="for">
              <div className="txt-box">Developer tools</div>
              <div className="icon-box">
                <img
                  className="origin"
                  src="/img/homepage/arrow_new.png"
                  alt=""
                />
                <img
                  className="active"
                  src="/img/homepage/arrow_new_active.png"
                  alt=""
                />
              </div>
            </div>
            <div className="thir">
              Used for handling some internal and third-party tools for CocoCat
              products and services.
            </div>
          </div>
          <div className="item-box">
            <div className="fir">
              <img
                className="origin"
                src="/img/homepage/solution.png"
                alt=""
              />
              <img
                className="active"
                src="/img/homepage/solution_active.png"
                alt=""
              />
            </div>
            <div className="for">
              <div className="txt-box">Solution Provider Network</div>
              <div className="icon-box">
                <img
                  className="origin"
                  src="/img/homepage/arrow_new.png"
                  alt=""
                />
                <img
                  className="active"
                  src="/img/homepage/arrow_new_active.png"
                  alt=""
                />
              </div>
            </div>
            <div className="thir">Web3 network node for developers.</div>
          </div>
          <div className="item-box" style={{opacity:0}}>
            <div className="fir">
              <img src="" alt="" />
            </div>

            <div className="sec">CocoCat SDK: Deploy a local test rollup</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
