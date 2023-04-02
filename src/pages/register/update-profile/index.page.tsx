import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'

const profileUpdateFormSchema = z.object({
  bio: z.string(),
})

type ProfileUpdateFormData = z.infer<typeof profileUpdateFormSchema>

export default function UpdateProfile() {
  const session = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateFormSchema),
  })

  async function handleProfileUpdate({ bio }: ProfileUpdateFormData) {
    await api.put('/users/profile', { bio })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Defina sua disponibilidade</Heading>
          <Text>Por último, uma breve descrição e uma foto de perfil.</Text>

          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleProfileUpdate)}>
          <label>
            <Text size="sm">Foto de perfil</Text>
            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user.name}
            />
          </label>

          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register('bio')} />
          </label>

          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>

          <Button size="sm" type="submit" disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  return {
    props: { session },
  }
}
