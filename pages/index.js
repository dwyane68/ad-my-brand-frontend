import React, { Component } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ajax from "../services/ajax";
import { notification } from "antd";
import { CarFilled } from '@ant-design/icons';

import GoogleMapReact from 'google-map-react';
import Modal from 'antd/lib/modal/Modal';

class Home extends Component  {

  static defaultProps = {
    center: {
      lat: 37.7509316476402,
      lng: -122.4114199662057
    },
    zoom: 11
  };

  state = {
    trucks: [],
    showModal: false,
    selectedTruck: null
  }

  componentDidMount() {
    this.findTrucks(this.props.center.lat, this.props.center.lng)
  }

  findTrucks = (lat, lng) => {
    this.setState({
      loading: true
    });

    const params = {
      latitude: lat,
      longitude: lng
    };
    
    ajax('get',`/find-trucks`, params).then((response) => {
      this.setState({
        trucks: response.data,
        loading: false
      })
    }, ({ message }) => {
      notification.error({
        message: 'Error',
        description: message
      });
      this.setState({
        loading: false
      });
    });
  }

  onBoundsChange = (map, maps) => {
    console.log(map);
    
    this.setState({
      trucks: [],
      loading: true
    })
    this.findTrucks(map[0], map[1]);
    
    // use map and maps objects
  };

  onChildClick = (key, truckItem) => {
    this.setState({
      showModal: true,
      selectedTruck: this.state.trucks[key]
    })
    
    // use map and maps objects
  };


  render() {
    const { trucks, showModal, selectedTruck } = this.state;
    
    const truckComponents = Object.keys(trucks).map((key) => {
      const truck = trucks[key]
      return (
        <CarFilled 
          lat={truck.latitude}
          lng={truck.longitude}
          style={{ fontSize: '30px', color: 'red' }}
          objectKey={key}
        />
      )
    })

    const TruckDetail  = ({showModal, handleOk, handleCancel, truck = {}}) => {
      return (
        <Modal title={truck && truck.applicant} visible={showModal} onOk={handleOk} onCancel={handleCancel}>
          <p><b>Truck Type:</b> {truck && truck.facility_type}</p>
          <p><b>Address:</b> {truck && truck.address}</p>
          <p><b>Detail Address:</b> {truck && truck.location_description}</p>
        </Modal>
      )
    }

    return (
      <div className={styles.container}>
        <Head>
          <title>Find Trucks</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1 className={styles.title} style={{marginTop: 100}}>
            Drag the map to find trucks!
          </h1>
  
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: ''}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              onBoundsChange={this.onBoundsChange}
              onChildClick={this.onChildClick}
            >
              {truckComponents}
            </GoogleMapReact>
          </div>

          <TruckDetail 
            showModal={showModal} 
            handleCancel={() => this.setState({showModal: false, selectedTruck: null})} 
            handleOk={() => this.setState({showModal: false, selectedTruck: null})}
            truck={selectedTruck}
          />
        </main>
  
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    )
  }
}

export default Home;