import { prismaClient } from '@shared/prisma';
import { Call } from '@prisma/client';

class GetCallService {
  public async execute(): Promise<Call[]> {
    let calls = await prismaClient.call.findMany({
      include: {
        user: true,
      },
    });

    return calls;
  }
}

export { GetCallService };
