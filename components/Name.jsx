import Link from 'next/link';
import {useState} from 'react';

const getWeight = (x1, y1, x2, y2) => {
  const xDist = 2 * Math.pow(x1 - x2, 2);
  const yDist = 5 * Math.pow(y1 - y2, 2);
  const dist = Math.round(Math.sqrt(xDist + yDist)) / Math.max(x2, y2);
  const weight = Math.max(100, 900 - (dist * 900));
  return weight;
};

const getWidth = (x1, x2) => {
  const xDist = 1.5 * Math.abs(x1 - x2) / x2;
  console.log(xDist);
  const weight = Math.max(85, 100 - (15 * xDist));
  return weight;
};

const Name = () => {
  const [weight, setWeight] = useState(100);
  const [width, setWidth] = useState(150);

  return (
    <section
      onMouseMove={({clientX, clientY}) => {
        if(process.browser) {
          setWeight(getWeight(clientX, clientY, window.innerWidth / 2, window.innerHeight / 2));
          setWidth(getWidth(clientX, window.innerWidth / 2));
        }

      }
      }
    >
      <Link href="/work">
        <a data-shadow="Hiram Moncivais">Hiram Moncivais</a>
      </Link>

      <style jsx>{`
        display: flex;
        align-items: center;
        justify-content: center;
        grid-area: name;
        text-align: center;
        font-size: 96px;
        font-weight: 800;
        box-sizing: border-box;

        @font-face {
          font-family: 'IBM Plex Sans Roman';
          src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/IBMPlexSansVar-Roman.ttf');
        }

        a {
          height: 100%;
          width: 100%;
          color: black;
          transition: 0.25s;
          text-decoration: none;
          font-variation-settings: 'wght' ${weight}, 'wdth' ${width};
        }

        a:hover {
          color: blue;
        }
      `}</style>
    </section>
  );
};

export default Name;
