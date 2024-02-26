import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularBar = ( {voteAverage}) => {

    const changeColorForVoteAverage = (voteAverage) => {
        if ( voteAverage >= 7.5 ) {
            return "#db1623ce";
        } else if ( voteAverage >= 5 ) {
            return "green";
        } else {
            return "rgba(255, 255, 0, 0.6)"
        }
    }
 
    return (
        <CircularProgressbar
        value={voteAverage}
        maxValue={10}
        text={voteAverage}
        background
        backgroundPadding={9}
        styles={buildStyles({
        backgroundColor: "#0C0000",
        textColor: "#fff",
        textSize: "30px",
        pathColor: changeColorForVoteAverage(voteAverage),
        trailColor: "rgba(122, 122, 122, 0.515)"
        })}
        />
    )

}

export default CircularBar;