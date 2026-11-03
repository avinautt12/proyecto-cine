import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { cineApi } from '@/services/api';
import { Pelicula } from '@/types/cine';

const COLORS = {
  primary: '#E50914', // rojo Netflix/cine
  dark: '#141414',
  card: '#1f1f1f',
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  accent: '#ffd700', // dorado
  border: '#333333',
};

export default function HomeScreen() {
  const router = useRouter();
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;
    cineApi
      .getPeliculas()
      .then((data) => {
        if (montado) {
          setPeliculas(data);
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
  }, []);

  if (cargando) {
    return (
      <GestureHandlerRootView style={styles.root}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </GestureHandlerRootView>
    );
  }

  if (error) {
    return (
      <GestureHandlerRootView style={styles.root}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>No se pudo conectar</Text>
          <Text style={styles.errorSub}>{error}</Text>
          <Pressable style={styles.retry} onPress={() => window.location.reload?.()}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <FlatList
        data={peliculas}
        keyExtractor={(item) => String(item.identificador)}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push(`/peliculas/${String(item.identificador)}` as any)
            }
          >
            <View style={styles.poster}>
              <Text style={styles.posterEmoji}>🎬</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{item.director?.director}</Text>
                <Text style={styles.metaDivider}>•</Text>
                <Text style={styles.metaText}>{item.categoria?.categoria}</Text>
                <Text style={styles.metaDivider}>•</Text>
                <Text style={styles.metaText}>{item.duracion} min</Text>
              </View>
            </View>
          </Pressable>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🎬 Sala de Cines</Text>
            <Text style={styles.headerSub}>
              {peliculas.length} películas disponibles
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        style={styles.container}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 24,
    gap: 14,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  poster: {
    width: '100%',
    height: 200,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterEmoji: {
    fontSize: 64,
  },
  cardContent: {
    padding: 14,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  metaDivider: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginHorizontal: 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
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
  retry: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
