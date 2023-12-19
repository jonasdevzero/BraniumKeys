import { EditKeyPairDTO } from '@domain/dtos';

export interface EditKeyPairRepository {
	edit(data: EditKeyPairDTO): Promise<void>;
}
