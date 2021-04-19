import {useEffect, useState} from 'react';

const currTime = () => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // return new Date().toLocaleDateString('en-US', options);
  // return new Date().toLocaleDateString('en-US', {
  //   timeZone: 'America/New_York',
  // });
  // return new Date().toLocaleString('en-US', {
  // timeZone: 'America/New_York',
  // weekday: 'long',
  // year: 'long',
  // month: 'short',
  // day: 'short',
  // });
  x.toLocaleString('en-US', {
    dateStyle: 'long',
    timeZone: 'America/New_York',
  });

  x.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    timeStyle: 'medium',
  });
};

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <p>Based in</p>
      <p>
        <strong>New York City</strong>
      </p>
      <br />
      <p>
        {time.toLocaleString('en-US', {
          dateStyle: 'long',
          timeZone: 'America/New_York',
        })}
      </p>
      <p>
        {time.toLocaleString('en-US', {
          timeZone: 'America/New_York',
          timeStyle: 'medium',
        })}
      </p>
      <style jsx>{`
        grid-area: clock;
        align-self: center;
        text-align: right;

        p {
          margin: 0;
        }

        strong {
          font-weight: 800;
        }
      `}</style>
    </section>
  );
};

export default Clock;
