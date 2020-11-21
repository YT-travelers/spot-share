package net.yttravelers.spotshare.services

import net.yttravelers.spotshare.controllers.SpotForm
import net.yttravelers.spotshare.entities.Spot
import net.yttravelers.spotshare.repositories.SpotRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import javax.persistence.EntityNotFoundException

const val HOUR = 60

@Service
@Transactional
class SpotService {
    @Autowired
    lateinit var spotRepository: SpotRepository

    fun getAll(): List<Spot> {
        return spotRepository.findAll()
    }

    fun findSpotOrException(id: Int): Spot {
        return spotRepository.findByIdOrNull(id) ?: throw EntityNotFoundException()
    }

    fun addSpot(spotForm: SpotForm): Spot {
        val spot = Spot()
        return setPropertiesInSpot(spot, spotForm)
    }

    fun updateSpot(id: Int, spotForm: SpotForm): Spot {
        val spot = this.findSpotOrException(id)
        return setPropertiesInSpot(spot, spotForm)
    }

    //TODO: メソッド名を考える
    private fun setPropertiesInSpot(spot: Spot, spotForm: SpotForm): Spot {
        if (spotForm.spotName !== null) spot.spotName = spotForm.spotName
        if (spotForm.costExpectation !== null) spot.costExpectation = spotForm.costExpectation
        if (spotForm.requiredHours !== null || spotForm.requiredMinutes !== null) {
            val minutes = spotForm.requiredHours?.times(HOUR) ?: 0
            spot.requiredMinutes = spotForm.requiredMinutes?.plus(minutes)
        }
        if (spotForm.url !== null) spot.url = spotForm.url
        if (spotForm.summary !== null) spot.summary = spotForm.summary

        //TODO: 画像の保存
        return spotRepository.save(spot)
    }

    fun deleteSpot(id: Int) {
        spotRepository.deleteById(id)
    }
}