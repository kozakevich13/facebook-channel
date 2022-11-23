

function Home(data) {

    console.log(data.res.name)
 
  return (
    <>
        <p>home is here</p> 
        <p>Welcom {data.res.name}</p>
        {/* <img alt='logo' src={data.res.picture.data.url}></img>    */}
    </>
  );
}

export default Home;
