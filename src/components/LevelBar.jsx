import "../styles/levelBar.css"

export function LevelBar({name,level = 10}){
  return(
    <>
      <div className="contianer-level-bar">
        <span className="level-bar-name">{name}</span>
        <div className="bar">
          <div className="level-bar">
            <div className="level"
            style={{
              width:`${level}%`,
              backgroundColor:"#FFCB05",
              border:"1px solid #1100FF",
              borderRadius:"15px",
              height:"100%",
              position:"absolute",
              top:"0px",
              left:"0px"
            }}></div>
          </div>
          <span className="level-number">
            {level}
          </span>
        </div>

      </div>
    </>
  )
}