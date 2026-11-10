import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cineApi } from '@/services/api';
import { Pelicula } from '@/types/cine';

const COLORS = {
  primary: '#D81A21',
  dark: '#000000',
  card: '#1A1A1A',
  text: '#ffffff',
  textSecondary: '#A0A0A0',
};

export default function DetallePelicula() {
  const { id } = useLocalSearchParams();
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let montado = true;
    cineApi.getPelicula(Number(id))
      .then((data) => {
        if (montado) {
          setPelicula(data);
          setCargando(false);
        }
      })
      .catch(() => {
        if (montado) setCargando(false);
      });
    return () => { montado = false; };
  }, [id]);

  if (cargando) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (!pelicula) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Error al cargar la película</Text>
      </SafeAreaView>
    );
  }

  const titulo = (pelicula as any).Titulo ?? pelicula.titulo;
  const director = (pelicula as any).Director ?? pelicula.director?.director;
  const categoria = (pelicula as any).Categoria ?? pelicula.categoria?.categoria;
  const duracion = (pelicula as any).Duracion ?? pelicula.duracion;
  const sinopsis = (pelicula as any).Sinopsis ?? pelicula.sinopsis ?? 'Sin sinopsis disponible.';

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: (pelicula as any).Imagen ?? pelicula.imagen ?? 'https://via.placeholder.com/500x750?text=Sin+Poster' }}
          style={styles.posterImage}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{titulo}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{director}</Text>
            <Text style={styles.metaDivider}>|</Text>
            <Text style={styles.metaText}>{categoria}</Text>
            <Text style={styles.metaDivider}>|</Text>
            <Text style={styles.metaText}>{duracion} min</Text>
          </View>

          <View style={styles.sinopsisContainer}>
            <Text style={styles.sinopsisTitle}>SINOPSIS</Text>
            <Text style={styles.sinopsisBody}>{sinopsis}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  content: {
    paddingBottom: 40,
  },
  posterImage: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    padding: 20,
    marginTop: -20,
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 30,
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  metaDivider: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  sinopsisContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.card,
    paddingTop: 24,
  },
  sinopsisTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  sinopsisBody: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.textSecondary,
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.text,
    fontSize: 18,
  },
});