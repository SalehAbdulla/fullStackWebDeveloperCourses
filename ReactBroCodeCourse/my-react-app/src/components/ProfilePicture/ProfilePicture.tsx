import "./ProfilePicture.css";

export const ProfilePicture = () => {
  const image = "https://picsum.photos/200/300";
  
  function handleClick(e: React.MouseEvent<HTMLImageElement>) {
    e.currentTarget.style.display = "none";
  }
  
  return (
    <div>
      <img onClick={(e) => handleClick(e)} src={image}></img>
    </div>
  );
};
