import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { cineApi } from '@/services/api';
import { Pelicula } from '@/types/cine';

const COLORS = {
  primary: '#E50914',
  dark: '#141414',
  card: '#1f1f1f',
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  accent: '#ffd700',
  border: '#333333',
};

export default function PeliculaDetalleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const idStr = typeof id === 'string' ? id : id?.[0];

  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idStr) {
      setError('No se recibió el ID de la película');
      setCargando(false);
      return;
    }
    let montado = true;
    cineApi
      .getPelicula(idStr)
      .then((data) => {
        if (montado) {
          setPelicula(data);
          setCargando(false);
        }
      })
      .catch((err) => {
        if (montado) {
          setError(err.message);
          setCargando(false);
        }
      });
    return () => {
      montado = false;
    };
  }, [idStr]);

  if (cargando) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error al cargar</Text>
        <Text style={styles.errorSub}>{error}</Text>
        <Pressable style={styles.volver} onPress={() => router.back()}>
          <Text style={styles.volverTexto}>Volver a la sala</Text>
        </Pressable>
      </View>
    );
  }

  if (!pelicula) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable style={styles.volver} onPress={() => router.back()}>
        <Text style={styles.volverTexto}>← Volver a la sala</Text>
      </Pressable>

      <View style={styles.poster}>
        <Text style={styles.posterEmoji}>🎬</Text>
      </View>

      <Text style={styles.titulo}>{pelicula.titulo}</Text>

      <View style={styles.metaContainer}>
        <View style={styles.metaChip}>
          <Text style={styles.metaChipText}>{pelicula.director?.director}</Text>
        </View>
        <View style={styles.metaChip}>
          <Text style={styles.metaChipText}>{pelicula.categoria?.categoria}</Text>
        </View>
        <View style={styles.metaChip}>
          <Text style={styles.metaChipText}>{pelicula.duracion} min</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.subtitulo}>Sinopsis</Text>
      <Text style={styles.sinopsis}>
        {pelicula.sinopsis ?? 'Sin sinopsis disponible.'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  volver: {
    marginBottom: 4,
  },
  volverTexto: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  errorSub: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginTop: 8,
  },
  poster: {
    width: '100%',
    height: 320,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  posterEmoji: {
    fontSize: 80,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 16,
    letterSpacing: -0.5,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  metaChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metaChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.accent,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  sinopsis: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
});
