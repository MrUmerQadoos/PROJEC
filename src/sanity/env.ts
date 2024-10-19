export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-19'

export const dataset = "production"

export const projectId= "ivg0r2q9"

export const token = "skaz37ZZE3RZo51OhmH0ApBvVzen1EteviTH74xmyGMVdybfmImvIYC291jmR5eIJ16oK9D8IkLCeXGTjmrafX1Ot8xscmiG9hycVYQfbPHgPIuvs06SVKzrdsDGmaglsG3J7oIbvexS3jQFGAxna4Y9MDepDLOO1Dx6lao8CPkUmNElHkj0"



function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
