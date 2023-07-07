import { GymsRepository } from '~src/repositores/gyms-repository'

interface ListNearbyGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

export class ListNearbyGymsService {
  constructor(private gymRepository: GymsRepository) {}

  async execute({ userLatitude, userLongitude }: ListNearbyGymsServiceRequest) {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return gyms
  }
}
