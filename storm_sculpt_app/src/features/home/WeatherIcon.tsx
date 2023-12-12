import { useSelector } from "react-redux";

const WeatherIcon = () => {
    const {data} = useSelector((state:any) => state.WeatherDetails)
    const realTdata = data.realTimedata
    const condition = realTdata.current?.condition?.text
    const time =   realTdata.location?.localtime.split(" ")[1]
    const timeSplit = time?.split(':') || []
    const timeSplit1 = Number(timeSplit[0])

    console.log(timeSplit1)

    const HandleTimeAndCondition = () => {
        if (timeSplit1 >= 6 && timeSplit1 <= 19 && condition === 'Sunny') {
            return 
        }
    }
    <div>
        {

        }
    </div>
}

export default WeatherIcon