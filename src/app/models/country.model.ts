import { z } from 'zod';

export const CountriesSchema = z.object({
  name: z
    .object({
      common: z.string(),
    })
    .readonly(),
  flags: z
    .object({
      png: z.string().url(),
      svg: z.string().url(),
    })
    .readonly(),
  population: z.number().readonly(),
  region: z.string().readonly(),
  capital: z.array(z.string()).readonly(),
  cca2: z.string().length(2).readonly(),
});

export const CountryDetailsSchema = z.object({
  name: z
    .object({
      common: z.string(),
      nativeName: z.record(z.string(), z.object({ common: z.string() })),
    })
    .readonly(),
  flags: z
    .object({
      png: z.string().url(),
      svg: z.string().url(),
    })
    .readonly(),
  population: z.number().readonly(),
  region: z.string().readonly(),
  subregion: z.string().readonly(),
  capital: z.array(z.string()).readonly(),
  cca2: z.string().length(2).readonly(),
  tld: z.array(z.string()).readonly(),
  currencies: z.record(
    z.string(),
    z.object({ name: z.string(), symbol: z.string() })
  ),
  languages: z.record(z.string(), z.string()),
  borders: z.array(z.string()),
});

export type Country = z.infer<typeof CountriesSchema>;
export type CountryDetails = z.infer<typeof CountryDetailsSchema>;
