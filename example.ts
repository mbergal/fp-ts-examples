// This is port of example in "Lightweight higher-kinded polymorphism"
// (https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf)
// to TypeScript using fp-ts
import { option, some } from "fp-ts/lib/Option";
import { URIS, Type, HKT } from "fp-ts/lib/HKT";
import { Monad1, Monad } from "fp-ts/lib/Monad";

function when<F extends URIS>(monad: Monad1<F>): (b: Boolean, ma: Type<F, void>) => Type<F, void>;
function when<F>(monad: Monad<F>): (b: Boolean, ma: HKT<F, void>) => HKT<F, void>;
function when<F>(monad: Monad<F>): (b: Boolean, ma: HKT<F, void>) => HKT<F, void> {
  return (b, ma) => (b ? ma : monad.of(undefined));
}

const a = when(option)(true, some(undefined));

function unless<F extends URIS>(monad: Monad1<F>): (b: Boolean, ma: Type<F, void>) => Type<F, void>;
function unless<F>(monad: Monad<F>): (b: Boolean, ma: HKT<F, void>) => HKT<F, void>;
function unless<F>(monad: Monad<F>): (b: Boolean, ma: HKT<F, void>) => HKT<F, void> {
  return (b, ma) => when(monad)(!b, ma);
}

const b = unless(option)(false, some(undefined));
