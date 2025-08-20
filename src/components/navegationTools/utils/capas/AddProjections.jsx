import proj4 from "proj4";
import { register } from "ol/proj/proj4";

export default function AddProjections() {
    proj4.defs(
        "EPSG:27700",
        "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 " +
        "+x_0=400000 +y_0=-100000 +ellps=airy " +
        "+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 " +
        "+units=m +no_defs"
    );
    proj4.defs(
        "EPSG:3857",
        "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
    );
    proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs +type=crs");
    proj4.defs(
        "EPSG:32718",
        "+proj=utm +zone=18 +south +datum=WGS84 +units=m +no_defs +type=crs"
    );
    proj4.defs(
        "EPSG:32717",
        "+proj=utm +zone=17 +south +datum=WGS84 +units=m +no_defs +type=crs"
    );
    proj4.defs(
        "EPSG:32719",
        "+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs +type=crs"
    );

    register(proj4);
}