export class Logistics {
  constructor(
    public tn: string,
    public err: string,
    public context: { time: string; desc: string }[] | null
  ) {}
}
