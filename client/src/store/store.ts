import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

import { WeatherData } from "../types"

interface RecentSearchesStore {
    data: [city: string, data: WeatherData][]
    addData: (city: string, weatherData: WeatherData) => void
    removeData: (city: string) => void
}

export const useRecentSearchesStore = create<RecentSearchesStore>()(
    devtools(
        persist(
            (set, _get) => ({
                data: [],
                // last search is always first in the array
                addData: (city, weatherData) =>
                    set((state) =>
                        state.data.some(([c]) => c === city)
                            ? // if the city is already in the list, replace the data with new data
                              // and move the city to the front of the list
                              {
                                  data: state.data
                                      .map(([c, d]) =>
                                          c === city ? [c, weatherData] : [c, d]
                                      )
                                      .sort((a, b) =>
                                          a[0] === city
                                              ? -1
                                              : b[0] === city
                                                ? 1
                                                : 0
                                      ) as [string, WeatherData][]
                              }
                            : // else, add the new city and data to the front of the list
                              { data: [[city, weatherData], ...state.data] }
                    ),
                removeData: (city) =>
                    set((state) => ({
                        data: state.data.filter(([c]) => c !== city)
                    }))
            }),
            {
                name: "recent-searches"
            }
        )
    )
)

export default useRecentSearchesStore
