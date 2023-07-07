import { GymsRepository } from '~src/repositores/gyms-repository'

interface SearchGymsServiceRequest {
  query: string
  page?: number
}

export class SearchGymsService {
  constructor(private gymRepository: GymsRepository) {}

  async execute({ query, page = 1 }: SearchGymsServiceRequest) {
    const gyms = await this.gymRepository.searchMany(query, page)

    return gyms
  }
}
