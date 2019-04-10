import React from 'react';
import PropTypes from 'prop-types';
// import Item from './item';
const Timeout = 500;
export default class BarcodeScanner extends React.Component {
  componentDidMount() {
    const url = 'https://cannoharito.github.io/booklog-barcode-search/zbar-processor.js';
    fetch(url, { mode: 'cors' }).then((res) => res.blob()).then((blob) => {
      this.worker = new Worker(URL.createObjectURL(blob));
      this.worker.onerror = (e) => {
        console.log('ERROR:Worker:' + e.name + e.toString());
      };
      this.worker.onmessage = (event) => {
        if (!this.scanFlag) {
          if (event.data.length > 0) this.callbackScan(event.data);
          this.timerId = setTimeout(() => {
            this.scan();
          }, Timeout);
        }
      };
    });
    // this.worker = new Worker(url);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.timerId = null;
    this.scanFlag = false;
    this.startScan(this.videoRef);
  }
  componentWillUnmount() {
    this.scanFlag = true;
    clearTimeout(this.timerId);
    this.canvas.remove();
    delete this.canvas;
    this.worker.terminate();
    delete this.worker;
  }
  startScan(videoRef) {
    if (!navigator.mediaDevices) {
      alert('p1:カメラを起動できないためご利用いただけません');
      return;
    }
    const constraints = {
      audio: false,
      video: { facingMode: 'environment' },
    };
    navigator.mediaDevices.getUserMedia(constraints).then(
      (stream) => {
        videoRef.srcObject = stream;
        videoRef.setAttribute('playsinline', true);
        videoRef.play();
        this.timerId = setTimeout(() => {
          this.scan();
        }, Timeout);
      }).catch((e) => {
        if (e.name == 'NotAllowedError') {
          alert('p2:ブラウザからのカメラアクセスを許可してください');
        } else {
          alert('p2:カメラを起動できないためご利用いただけません:' + e);
        }
      });
    console.log('INFO Usermedia width: ' + videoRef.videoWidth +
      ', height: ' + videoRef.videoHeight);
  }
  scan() {
    if (!this.scanFlag) {
      if (this.videoRef.readyState === this.videoRef.HAVE_ENOUGH_DATA) {
        this.canvas.width = Math.ceil(this.videoRef.videoWidth);
        this.canvas.height = Math.ceil(this.videoRef.videoHeight);
        this.ctx.drawImage(this.videoRef, 0, 0);
        const imageData = this.ctx.getImageData(0, 0,
          this.canvas.width, this.canvas.height);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.worker.postMessage(imageData, [imageData.data.buffer]);
      }
    }
  }
  callbackScan(datas) {
    for (let d of datas) {
      if (d[0] === 'EAN-13' && /^19[12]/.test(d[2])) continue;
      this.props.startSearch(d[2]);
    }
  }
  handleCloseScanner() {
    this.props.changeScannerState(false);
    const tracks = this.videoRef.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    this.videoRef.srcObject = null;
  }

  render() {
    return (
      <div>
        <video
          ref={(videoRef) => this.videoRef = videoRef}
          style={{
            width: '100%',
          }}
        ></video>
        <button onClick={() => this.handleCloseScanner()}>戻る</button>
      </div>
    );
  }
}

BarcodeScanner.propTypes = {
  changeScannerState: PropTypes.func,
  startSearch: PropTypes.func,
};
