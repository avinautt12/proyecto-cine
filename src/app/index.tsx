import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { cineApi } from '@/services/api';
import { Pelicula } from '@/types/cine';

const COLORS = {
  primary: '#D81A21', 
  dark: '#000000',   
  card: '#1A1A1A',    
  text: '#ffffff',
  textSecondary: '#A0A0A0',
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
      <SafeAreaView style={styles.root}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.root}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.centered}>
            <Text style={styles.errorText}>No se pudo conectar</Text>
            <Text style={styles.errorSub}>{error}</Text>
            <Pressable style={styles.retry} onPress={() => window.location.reload?.()}>
              <Text style={styles.retryText}>Reintentar</Text>
            </Pressable>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          data={peliculas}
          keyExtractor={(item, index) =>
            (item.identificador ?? (item as any).Identificador ?? index).toString()
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                router.push(`/peliculas/${String((item as any).Identificador ?? item.identificador)}` as any)
              }
            >
              <Image
                source={{ uri: (item as any).Imagen ?? item.imagen ?? 'https://via.placeholder.com/500x750?text=Sin+Poster' }}
                style={styles.posterImage}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <Text style={styles.titulo}>{(item as any).Titulo ?? item.titulo}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>{(item as any).Director ?? item.director?.director}</Text>
                  <Text style={styles.metaDivider}>|</Text>
                  <Text style={styles.metaText}>{(item as any).Categoria ?? item.categoria?.categoria}</Text>
                  <Text style={styles.metaDivider}>|</Text>
                  <Text style={styles.metaText}>{(item as any).Duracion ?? item.duracion} min</Text>
                </View>
              </View>
            </Pressable>
          )}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Cartelera</Text>
              <View style={styles.headerIndicator} />
              <Text style={styles.headerSub}>
                {peliculas.length} películas disponibles
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.text,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  headerIndicator: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.primary,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 2,
  },
  headerSub: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  listContent: {
    paddingBottom: 30,
    gap: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  posterImage: {
    width: '100%',
    height: 220,
  },
  cardContent: {
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  metaDivider: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
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
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  retryText: {
    color: COLORS.text,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});