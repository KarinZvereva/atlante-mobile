import { AbsDecoder } from '.';

export abstract class AbsMapper<T1, T2> {
  protected readonly decodeT1: AbsDecoder<T2, T1>;
  protected readonly decodeT2: AbsDecoder<T1, T2>;

  constructor(decoderT1: AbsDecoder<T2, T1>, decoderT2: AbsDecoder<T1, T2>) {
    this.decodeT1 = decoderT1;
    this.decodeT2 = decoderT2;
  }

  protected set InputT1(input: T1) {
    this.decodeT2.InputData = input;
  }

  protected set InputT2(input: T2) {
    this.decodeT1.InputData = input;
  }

  protected get OutT1(): T1 {
    return this.decodeT1.DecodedData;
  }

  protected get OutT2(): T2 {
    return this.decodeT2.DecodedData;
  }
}