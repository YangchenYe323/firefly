"use server";

import { Domain } from "@prisma/client";
import { ActionReturnTypeBase } from "../types";
import prisma from "@/db";
import { auth } from "@/lib/auth";

interface CreateDomainReturnType extends ActionReturnTypeBase {
    domain?: Domain;
}

export async function createDomain(domain: Domain): Promise<CreateDomainReturnType> {
    const authResult = await auth();
    if (!authResult) {
        return { success: false, message: "无法创建域名，请先登录" };
    }

    const domainToCreate = {
        name: domain.name,
        icpLicenseNumber: domain.icpLicenseNumber,
        publicSecurityFilingNumber: domain.publicSecurityFilingNumber,
        vtuberProfileId: domain.vtuberProfileId,
    }

    const createdDomain = await prisma.domain.create({
        data: domainToCreate,
    });

    return {
        success: true,
        domain: createdDomain,
    };
}

interface UpdateDomainReturnType extends ActionReturnTypeBase {
    domain?: Domain;
}

export async function updateDomain(domain: Domain): Promise<UpdateDomainReturnType> {
    const authResult = await auth();
    if (!authResult) {
        return { success: false, message: "无法更新域名，请先登录" };
    }

    if (!domain.id) {
        return { success: false, message: "域名ID不能为空" };
    }

    if (!domain.vtuberProfileId) {
        return { success: false, message: "域名所属的vtuberProfileId不能为空" };
    }

    const domainToUpdate = {
        name: domain.name,
        icpLicenseNumber: domain.icpLicenseNumber,
        publicSecurityFilingNumber: domain.publicSecurityFilingNumber,
    }

    const updatedDomain = await prisma.domain.update({
        where: { id: domain.id },
        data: domainToUpdate,
    });

    return {
        success: true,
        domain: updatedDomain,
    };
}

interface DeleteDomainReturnType extends ActionReturnTypeBase {
    domain?: Domain;
}

export async function deleteDomain(id: number): Promise<DeleteDomainReturnType> {
    const authResult = await auth();
    if (!authResult) {
        return { success: false, message: "无法删除域名，请先登录" };
    }

    const deletedDomain = await prisma.domain.delete({
        where: { id },
    });

    return {
        success: true,
        domain: deletedDomain,
    };
}