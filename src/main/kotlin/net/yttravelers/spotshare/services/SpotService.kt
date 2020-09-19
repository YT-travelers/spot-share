package net.yttravelers.spotshare.services

import net.yttravelers.spotshare.controllers.SpotForm
import net.yttravelers.spotshare.entities.Spot
import net.yttravelers.spotshare.repositories.SpotRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime
import javax.persistence.EntityNotFoundException

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
        return saveSpot(spot, spotForm)
    }

    fun updateSpot(id: Int, spotForm: SpotForm): Spot {
        val spot = this.findSpotOrException(id)
        return saveSpot(spot, spotForm)
    }

    //TODO: メソッド名を考える
    fun saveSpot(spot: Spot, spotForm: SpotForm): Spot {
//        spot.routeNumber = spotForm.routeNumber
//        spot.scheduleDateTime = LocalDateTime.parse(spotForm.scheduleDateTime)
//        spot.country = spotForm.country
//        spot.spotName = spotForm.spotName
//        spot.costExpectation = spotForm.costExpectation
//        spot.requiredTimeExpectation = spotForm.requiredTimeExpectation
//        spot.favoritePoint = spotForm.favoritePoint
//        spot.url = spotForm.url
//        spot.remark = spotForm.remark

        //TODO: 画像の保存
        //TODO: 座標の保存
        return spotRepository.save(spot)
    }
}