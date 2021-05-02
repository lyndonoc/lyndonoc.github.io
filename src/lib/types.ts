import { FixedObject, FluidObject } from 'gatsby-image';

export interface BaseObject<T = string> {
  [key: string]: T;
}

export interface GatsbyImageFixedType {
  childImageSharp: {
    fixed: FixedObject;
  };
}

export interface GatsbyImageFluidType {
  childImageSharp: {
    fluid: FluidObject;
  };
}
