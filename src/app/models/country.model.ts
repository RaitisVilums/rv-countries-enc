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
  cca3: z.string().length(2).readonly(),
});

export const CountryDetailsSchema = z
  .object({
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
    capital: z.array(z.string()).readonly(),
    cca3: z.string().readonly(),
    languages: z.record(z.string(), z.string()).readonly(),
    borders: z.array(z.string()).optional().readonly(),
    area: z.number().nullable().readonly(),
  })
  .strip();

export const CountryFormated = z.object({
  name: z.string(),
  countryCode: z.string().length(2),
  population: z.number().readonly(),
  flag: z.string().url(),
  area: z.number().nullable().readonly(),
  capital: z.array(z.string()).readonly(),
  nativeName: z.string(),
  languages: z
    .array(
      z.object({
        code: z.string(),
        name: z.string(),
      })
    )
    .readonly(),
  borders: z.array(z.string()).optional().readonly(),
  cca3: z.string().readonly(),
});

export type Country = z.infer<typeof CountriesSchema>;
export type CountryDetails = z.infer<typeof CountryDetailsSchema>;
export type CountryFormated = z.infer<typeof CountryFormated>;
