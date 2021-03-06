import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import config from "../config/config";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import jwt_decode from "jwt-decode";

const MapWithNoSSR = dynamic(() => import("../components/maps/Car"), {
  ssr: false,
});

const Track = () => {
  const { query } = useRouter();
  const router = useRouter();
  const [Data, setData] = useState();
  const [fbData, setfbData] = useState();
  const [duration, setDuration] = useState();

  var token = query.key;

  const firebaseConfig = {
    databaseURL: config.firebase_config.databaseURL,
  };

  useEffect(() => {
    if (token) {
      var decoded = jwt_decode(token);
      const expiredTime = decoded.exp - (new Date().getTime() + 1) / 1000;
      setDuration(expiredTime);

      const fetchData = async () => {
        const response = await axios.get(
          `${config.apiGateway.URL}vehicles/public/settings`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const result = response.data;
          setData(result[0]);
        } else {
          console.log("Opps something went wrong");
        }
      };
      fetchData();
      console.log(new Date(decoded.exp * 1000));
      setInterval(() => {
        if (decoded.exp < (new Date().getTime() + 1) / 1000) {
          router.push("/");
        } else {
          null;
        }
      }, 1000);
    } else {
      null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (Data) {
      //console.log(Data, "rtr");
      const getOneFBVehicle = async (id) => {
        const App = initializeApp(firebaseConfig, "onefbvehicle");
        const db = getDatabase(App);
        await onValue(
          ref(db, id),
          (snapshot) => {
            setfbData(snapshot.val());
          },
          (error) => {
            console.error("error : ", error);
          },
          { onlyOnce: true }
        );
      };
      getOneFBVehicle(Data.SerialNumber);
      setInterval(() => {
        getOneFBVehicle(Data.SerialNumber);
        // console.log("updated");
      }, 15000);
    } else {
      null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Data]);

  useEffect(() => {
    if (fbData) {
      //console.log(fbData, "dmt");
    } else {
      null;
    }
  }, [fbData]);

  return (
    <div id="map">
      <MapWithNoSSR data={Data} fbData={fbData} duration={duration} />
    </div>
  );
};
export default Track;
// translation ##################################
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["main"])),
    },
  };
}
// translation ##################################
