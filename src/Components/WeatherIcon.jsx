import React, { Component } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudSun, faCloud, faBolt, faWind, faCloudRain, faCloudSunRain, faCloudShowersHeavy, faSnowflake,faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../WeatherIcon.css';
library.add(faCloudSun, faCloud, faBolt, faWind, faCloudRain, faCloudSunRain, faCloudShowersHeavy, faSnowflake,faSun);
class WeatherIcon extends Component {
    state = {
        iconReference: [
            { Main: 'Clear', iconName: 'sun', class: 'sun' },
            { Main: 'Rain', iconName: 'cloud-rain', class: 'rain' },
            { Main: 'Thunderstorm', iconName: 'bolt', class: 'thunderstorm' },
            { Main: 'Clouds', iconName: 'cloud', class: 'cloud' },
            { Main: 'Snow', iconName: 'snowflake', class: 'snow' }
        ]
    }

    getIconReference = (mainStatus) => {
        let item = this.state.iconReference.filter(element => {
            return element.Main === mainStatus;
        });
        return {
            iconName: item[0].iconName,
            iconClass: item[0].class
        }
    }

    render() {

        if (this.props.status) {
            const { iconName, iconClass } = this.getIconReference(this.props.status);
            return (
                <div>
                    <FontAwesomeIcon
                        icon={iconName}
                        size={this.props.size}
                        className={iconClass}
                    />
                </div>
            );
        }
        else{
            return(<div>No icon available</div>);
        }
    }
}

export default WeatherIcon;