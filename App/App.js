import React, { useState, useEffect } from "react";
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";
import { image } from "@tensorflow/tfjs-core";

const modelJson = require('C:/React/App/App/assets/model/model.json')
const modelWeight = require('C:/React/App/App/assets/model/modelWeight.bin')


givePrediction = async() => {
  //const img = require(image);
  //const imageAssetPath = Image.resolveAssetSource(img);
  const model = await tf.loadLayersModel(
    bundleResourceIO(modelJson, modelWeight));
  const response = await fetch(image, {}, { isBinary: true });
  const rawImageData = await response.arrayBuffer();
  const imageTensor = decodeJpeg(rawImageData);
  let prediction = (await model.predict(imageTensor))[0];
  return prediction
}
const CameraModule = (props) => {
   const [cameraRef, setCameraRef] = useState(null);
   const [type, setType] = useState(Camera.Constants.Type.back);
return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.setModalVisible();
      }}
    >
      <Camera
        style={{ flex: 0.8 }}
        ratio="16:9"
        flashMode={Camera.Constants.FlashMode.off}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              icon="close"
              style={{ marginLeft: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
              props.setModalVisible();
              //givePrediction();
              }}
            >
              Close
            </Button>
           <TouchableOpacity
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync();
                  props.setImage(photo);
                  props.setModalVisible();
                  //givePrediction();
                }
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                  marginTop: 16,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: "white",
                    height: 40,
                    width: 40,
                    backgroundColor: "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
       <Button
              icon="axis-z-rotate-clockwise"
              style={{ marginRight: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
           {type === Camera.Constants.Type.back ? "Front" : "Back "}
            </Button>
          </View>
        </View>
      </Camera>
    </Modal>
  );
};
// should we comment the code from here on
export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }, []);
  if (hasPermission === null) {
      return <View />;
    }
  if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#eeee",
            width: 120,
            height: 120,
            borderRadius: 100,
            marginBottom: 8,
          }}
        >
  {/*         { <Image
            source={{ uri: image }}
            style={{ width: 120, height: 120}}
          /> } */}
        </View>
        <Button
          style={{ width: "30%", marginTop: 16 }}
          icon="camera"
          mode="contained"
          onPress={() => {
            //givePrediction()
            setShowCamera(true);
          }}
        >
          Camera
        </Button>
        
      {camera && (
          <CameraModule
            showModal={camera}
            setModalVisible={() => setShowCamera(false)}
            setImage={(result) => setImage(result.uri)}
          />
        ) }
      </View>
    );
}