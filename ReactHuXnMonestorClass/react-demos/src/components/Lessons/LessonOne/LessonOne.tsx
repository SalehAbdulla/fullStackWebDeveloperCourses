const LessonOne = () => {
  return (
    <section id="section">
      <form>

        <h1>This is a comment</h1>
        <h2>for="name" is a reserver word, we can't use it in react applications JSX, therefore, we have to use htmlFor="" instead. </h2>
        <h3>Why do use htmlFor="" ?</h3>
        <h4>To link the input with the label, as will improve UI by adding a focus once the use pressed the Name label</h4>
        
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" placeholder="Enter Your name" />
      </form>
    </section>
  );
};

export default LessonOne;
