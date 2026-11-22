import { AuthScreen } from '@/components/auth/auth-screen';
import { TextField } from '@/components/forms/text-field';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { validateEmail } from '@/lib/validation';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'expo-router';
import { Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

type Errors = { email?: string; password?: string };

export default function LoginScreen() {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit() {
    const nextErrors: Errors = {
      email: validateEmail(email),
      password: password ? undefined : 'Saisissez votre mot de passe.',
    };
    setErrors(nextErrors);
    setFormError(undefined);
    if (nextErrors.email || nextErrors.password) return;

    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      router.replace('/');
    } catch {
      setFormError('Connexion impossible. Vérifiez vos informations et réessayez.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthScreen
      title="Bon retour parmi nous"
      subtitle="Connectez-vous pour retrouver vos voyages."
      footer={
        <Pressable
          role="link"
          className="min-h-11 items-center justify-center"
          onPress={() => router.replace('/register')}>
          <Text className="text-muted-foreground text-sm">
            Pas encore de compte ?{' '}
            <Text className="text-primary text-sm font-bold">Créer un compte</Text>
          </Text>
        </Pressable>
      }>
      <View className="gap-4">
        <TextField
          label="Adresse e-mail"
          icon={Mail}
          placeholder="vous@exemple.com"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
        />
        <TextField
          label="Mot de passe"
          icon={Lock}
          placeholder="Votre mot de passe"
          secure
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          autoCapitalize="none"
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      </View>

      {formError ? (
        <Text role="alert" className="text-destructive text-sm">
          {formError}
        </Text>
      ) : null}

      <Button size="lg" disabled={submitting} onPress={onSubmit}>
        <Text>{submitting ? 'Connexion…' : 'Se connecter'}</Text>
      </Button>
    </AuthScreen>
  );
}