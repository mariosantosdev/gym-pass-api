import { GymsRepository } from '~src/repositores/gyms-repository'

interface CreateGymServiceRequest {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export class CreateGymService {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    name,
    description,
    latitude,
    longitude,
    phone,
  }: CreateGymServiceRequest) {
    const gym = await this.gymRepository.create({
      name,
      description,
      latitude,
      longitude,
      phone,
    })

    return gym
  }
}
