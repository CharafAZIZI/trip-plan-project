import { AuthScreen } from '@/components/auth/auth-screen';
import { TextField } from '@/components/forms/text-field';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { validateEmail, validateName, validatePassword } from '@/lib/validation';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'expo-router';
import { Check, Lock, Mail, UserRound } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

type Errors = { name?: string; email?: string; password?: string; terms?: string };

export default function RegisterScreen() {
  const router = useRouter();
  const signUp = useAuthStore((state) => state.signUp);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit() {
    const nextErrors: Errors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      terms: accepted ? undefined : 'Vous devez accepter les conditions pour continuer.',
    };
    setErrors(nextErrors);
    setFormError(undefined);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitting(true);
    try {
      await signUp(name, email.trim(), password);
      router.replace('/');
    } catch {
      setFormError('Inscription impossible pour le moment. Réessayez.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthScreen
      title="Créer votre compte"
      subtitle="Rejoignez TripPlan et découvrez le Maroc autrement."
      footer={
        <Pressable
          role="link"
          className="min-h-11 items-center justify-center"
          onPress={() => router.replace('/login')}>
          <Text className="text-muted-foreground text-sm">
            Déjà inscrit ? <Text className="text-primary text-sm font-bold">Se connecter</Text>
          </Text>
        </Pressable>
      }>
      <View className="gap-4">
        <TextField
          label="Nom complet"
          icon={UserRound}
          placeholder="Votre nom"
          value={name}
          onChangeText={setName}
          error={errors.name}
          autoComplete="name"
          textContentType="name"
          returnKeyType="next"
        />
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
          placeholder="8 caractères minimum"
          secure
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="done"
        />
      </View>

      <View className="gap-1.5">
        <Pressable
          role="checkbox"
          aria-checked={accepted}
          className="min-h-11 flex-row items-start gap-3"
          onPress={() => setAccepted((value) => !value)}>
          <View
            className={cn(
              'mt-0.5 size-6 items-center justify-center rounded-lg border-2',
              accepted ? 'bg-primary border-primary' : 'bg-card border-input'
            )}>
            {accepted ? <Icon as={Check} className="text-primary-foreground size-4" /> : null}
          </View>
          <Text className="text-muted-foreground flex-1 text-sm leading-5">
            J’accepte les conditions d’utilisation et la politique de confidentialité.
          </Text>
        </Pressable>
        {errors.terms ? (
          <Text role="alert" className="text-destructive text-sm">
            {errors.terms}
          </Text>
        ) : null}
      </View>

      {formError ? (
        <Text role="alert" className="text-destructive text-sm">
          {formError}
        </Text>
      ) : null}

      <Button size="lg" disabled={submitting} onPress={onSubmit}>
        <Text>{submitting ? 'Création du compte…' : 'S’inscrire'}</Text>
      </Button>
    </AuthScreen>
  );
}