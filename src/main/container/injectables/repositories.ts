import * as repositories from "@infra/db/mongodb/repositories";
import { Split } from "../types/split";

type Splitted = Split<keyof typeof repositories, "Mongodb">;
type RepositoryName = `${Splitted[0]}${Splitted[1]}`;

const mapped = {} as Record<RepositoryName, unknown>;

for (const [key, instance] of Object.entries(repositories)) {
	const [prefix, suffix] = key.split("Mongodb");
	const mappedKey = `${prefix}${suffix}` as RepositoryName;

	mapped[mappedKey] = instance;
}

export default mapped;
