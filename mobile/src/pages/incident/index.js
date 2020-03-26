import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api';

export default function Incident() {

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const navigation = useNavigation();


  function navigationToDetail(incident) {
    navigation.navigate('Detail', {incident});
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }
    if (total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);
    const response = await api.get('incident', {
      params: { page }
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['X-Total-Count'])
    setPage(page + 1);
    setLoading(false);

  }

  useEffect( () => {
    loadIncidents();
  }, []);


  return (
    <View style={styles.container}>
      
      <View styles={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
  Total of cases: <Text style={styles.headerTextBold}>{total}</Text>
        </Text>
      </View>

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.description}>Choose one of many open cases below and be the hero  </Text>


      <FlatList 
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        style={styles.incidentList}
        showsVerticalScrollIndicator={true}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={ ( { item: incident } ) => (
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>NGO:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>CASE:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>


          <Text style={styles.incidentProperty}>VALUE:</Text>
          <Text style={styles.incidentValue}>{
              Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL'}).format(incident.value)}
          </Text>

          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigationToDetail(incident)}
          >
            <Text style={styles.detailsButtonText}>See more details</Text>
            <Feather name="arrow-right" size={16} color="#E02041"/>
          </TouchableOpacity>
        </View>
        )}
      />
    </View>
  );
}
