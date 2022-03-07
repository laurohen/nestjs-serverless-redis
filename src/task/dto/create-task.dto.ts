import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    dateExecution: Date;

    @ApiProperty()
    situation: boolean;

    @ApiProperty()
    priority: number;

    @ApiProperty()
    dateCompletion: Date;
}
