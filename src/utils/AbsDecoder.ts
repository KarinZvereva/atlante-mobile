
export abstract class AbsDecoder<IT = any, OT = any> {
  protected inputData?: IT;
  protected readonly decodeFn: (input: IT) => OT;
  
  protected constructor (decodeFn: (input: IT) => OT, input?: IT) {
    this.inputData = input;
    this.decodeFn = decodeFn;
  }

  public set InputData(input: IT) {
    this.inputData = input;
  }

  public get DecodedData(): OT {
    return this.decodeFn(this.inputData || { } as IT);
  }
}
