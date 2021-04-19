import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react';

import Clock from '../components/Clock';
import Greeting from '../components/Greeting';
import Name from '../components/Name';

export default function Index() {
  return (
    <>
      <Head>
        <title>Hiram Moncivais</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Cabin|Muli:400,700,800|Noto+Sans|Nunito+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <Greeting />

        <p className="intro">I'm</p>

        <p className="job">UX Engineer</p>

        <section className="status">
          <p>
            <strong>Currently:</strong>
          </p>
          <p>Working on the Design System team at Compass</p>
        </section>

        <Name />

        <Clock />

        <Link href="/about">
          <a className="about">About</a>
        </Link>

        <p className="emoji">🍚</p>
      </main>

      <style jsx global>{`
        html,
        body {
          margin: 0;
        }
      `}</style>
      <style jsx>{`
        @font-face {
          font-family: 'IBM Plex Sans Roman';
          src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/IBMPlexSansVar-Roman.ttf');
        }

        * {
          box-sizing: border-box;
        }

        a {
          text-decoration: none;
        }

        p {
          padding: 0;
          margin: 0;
        }

        main {
          display: grid;
          width: 100vw;
          height: 100vh;
          padding: 4vh 3vw;
          grid-template-areas:
            'greeting intro job'
            'status name clock'
            'about idk emoji';
          grid-template-rows: 4vh 1fr 4vh;
          grid-template-columns: 128px 1fr 128px;
          // font-family: 'Muli', sans-serif;
          font-family: 'IBM Plex Sans Roman';
        }

        .greeting {
          grid-area: greeting;
        }

        .intro {
          grid-area: intro;
          text-align: center;
        }

        .job {
          grid-area: job;
          justify-self: end;
        }

        .status {
          grid-area: status;
          align-self: center;
        }

        .about {
          grid-area: about;
          align-self: end;
        }

        .emoji {
          grid-area: emoji;
          text-align: right;
          align-self: end;
          justify-self: end;
        }
      `}</style>
    </>
  );
}
