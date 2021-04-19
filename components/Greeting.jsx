const greetings = ['Hola!', 'Hey there!', '你好！'];

console.log(Math.floor(Math.random() * greetings.length));

const Greeting = () => (
  <>
    <p className="greeting">
      {greetings[Math.floor(Math.random() * greetings.length)]}
    </p>
    <style jsx>{`
      grid-area: greeting;
      margin: 0;
    `}</style>
  </>
);

export default Greeting;
